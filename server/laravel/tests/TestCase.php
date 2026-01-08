<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected string $apiPrefix = '/api';

    protected function api(string $path): string
    {
        return $this->apiPrefix . '/' . ltrim($path, '/');
    }

    protected function apiGet(string $path, array $headers = [])
    {
        return $this->getJson($this->api($path), $headers);
    }

    protected function apiPost(string $path, array $data = [], array $headers = [])
    {
        return $this->postJson($this->api($path), $data, $headers);
    }

    protected function apiPut(string $path, array $data = [], array $headers = [])
    {
        return $this->putJson($this->api($path), $data, $headers);
    }

    protected function apiDelete(string $path, array $data = [], array $headers = [])
    {
        return $this->deleteJson($this->api($path), $data, $headers);
    }

    // =========================
    // Admin (web) path helpers
    // =========================

    protected string $adminPrefix = '/api/admin';

    protected function admin(string $path): string
    {
        return $this->adminPrefix . '/' . ltrim($path, '/');
    }

    protected function adminGet(string $path, array $headers = [])
    {
        return $this->getJson($this->admin($path), $headers);
    }

    protected function adminPost(string $path, array $data = [], array $headers = [])
    {
        return $this->postJson($this->admin($path), $data, $headers);
    }

    protected function adminPut(string $path, array $data = [], array $headers = [])
    {
        return $this->putJson($this->admin($path), $data, $headers);
    }

    protected function adminDelete(string $path, array $data = [], array $headers = [])
    {
        return $this->deleteJson($this->admin($path), $data, $headers);
    }
}
