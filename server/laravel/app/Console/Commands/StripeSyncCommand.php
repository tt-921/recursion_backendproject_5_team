<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\StripeSyncService;

class StripeSyncCommand extends Command
{
    protected $signature = 'stripe:sync';
    protected $description = 'Sync Stripe product/price IDs to local DB';

    private StripeSyncService $stripeSyncService;

    public function __construct(StripeSyncService $stripeSyncService)
    {
        parent::__construct();
        $this->stripeSyncService = $stripeSyncService;
    }

    public function handle(): int
    {
        $this->stripeSyncService->syncProductsAndPrices();
        $this->info('Stripe sync completed!');
        return 0;
    }
}
