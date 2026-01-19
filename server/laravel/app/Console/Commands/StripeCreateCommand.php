<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\StripeCreateService;

class StripeCreateCommand extends Command
{
    protected $signature = 'stripe:create';
    protected $description = 'Create products and prices on Stripe from local DB';

    private StripeCreateService $stripeCreateService;

    public function __construct(StripeCreateService $stripeCreateService)
    {
        parent::__construct();
        $this->stripeCreateService = $stripeCreateService;
    }

    public function handle(): int
    {
        $this->stripeCreateService->createAllProductsAndPrices();
        $this->info('Stripe create completed!');
        return 0;
    }
}
