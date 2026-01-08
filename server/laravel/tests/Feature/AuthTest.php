<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeMail;


class AuthTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test successful login.
     */
    public function test_user_can_login_with_valid_credentials()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('password123'),
        ]);

        
        $response = $this->apiPost('login', [
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
                ->assertJson([
                    'message' => 'Login successful'
                ]);
    }

    /**
     * Test login failure with invalid credentials.
     */
    public function test_user_cannot_login_with_invalid_credentials()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => Hash::make('password123'),
        ]);

        $response = $this->withSession([])->apiPost('login', [
            'email' => 'test@example.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(401)
                ->assertJson([
                    'message' => 'The provided credentials do not match our records.'
                ]);
    }

    /**
     * Test successful registration.
     */
    public function test_user_can_register_with_valid_data()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->withSession([])->apiPost('register', $userData);

        $response->assertStatus(201)
                ->assertJson([
                    'message' => 'User registered successfully'
                ])
                ->assertJsonStructure([
                    'message',
                    'user' => [
                        'id',
                        'name',
                        'email',
                        'created_at',
                        'updated_at'
                    ]
                ]);

        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ]);
    }

    /**
     * Test registration failure with invalid data.
     */
    public function test_user_cannot_register_with_invalid_data()
    {
        $invalidData = [
            'name' => '',
            'email' => 'invalid-email',
            'password' => '123',
            'password_confirmation' => '456',
        ];

        $response = $this->withSession([])->apiPost('register', $invalidData);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['name', 'email', 'password']);
    }

    /**
     * Test registration failure with duplicate email.
     */
    public function test_user_cannot_register_with_duplicate_email()
    {
        $existingUser = User::factory()->create([
            'email' => 'existing@example.com',
        ]);

        $userData = [
            'name' => 'John Doe',
            'email' => 'existing@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->apiPost('register', $userData);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['email']);
    }

    /**
     * Test successful logout.
     */
    public function test_authenticated_user_can_logout()
    {
        $user = User::factory()->create();

        // ログイン
        $loginResponse = $this->apiPost('login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $loginResponse->assertStatus(200);

        // ログアウト
        $logoutResponse = $this->apiPost('logout');

        $logoutResponse->assertStatus(200)
                      ->assertJson([
                          'message' => 'Logout successful'
                      ]);
    }

    /**
     * Test logout without authentication.
     */
    public function test_unauthenticated_user_cannot_logout()
    {
        $response = $this->apiPost('logout');

        $response->assertStatus(401);
    }

    /**
     * Test password confirmation validation.
     */
    public function test_registration_requires_password_confirmation()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'password_confirmation' => 'differentpassword',
        ];

        $response = $this->apiPost('register', $userData);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['password']);
    }

    /**
     * Test minimum password length validation.
     */
    public function test_registration_requires_minimum_password_length()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => '123',
            'password_confirmation' => '123',
        ];

        $response = $this->apiPost('register', $userData);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['password']);
    }

    /**
     * Test user is automatically logged in after registration.
     */
    public function test_user_is_automatically_logged_in_after_registration()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->apiPost('register', $userData);

        $response->assertStatus(201);

        // 登録後、ユーザー情報を取得できることを確認
        $user = User::where('email', 'john@example.com')->first();
        $this->actingAs($user, 'web'); // actingAsで認証済みを仮定
        $userResponse = $this->apiGet('user');
        
        $userResponse->assertStatus(200)
                    ->assertJson([
                        'name' => 'John Doe',
                        'email' => 'john@example.com',
                    ]);
    }

    /**
     * Test mail successfully receive email when register success
     */
    public function test_it_sends_welcome_email_on_registration()
    {
        Mail::fake();

        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        // ユーザー登録APIを呼び出す
        $response = $this->apiPost('register', $userData);

        $response->assertStatus(201);

        $user = User::where('email', 'test@example.com')->first();

        // WelcomeMail が送信されたか確認
        Mail::assertSent(WelcomeMail::class, function ($mail) use ($user) {
            return $mail->hasTo($user->email);
        });
    }
}