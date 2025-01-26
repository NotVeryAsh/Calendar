<?php

namespace App\Providers;

use App\Services\AuthService;
use App\Services\EventService;
use App\Services\ResponseService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind('event',function(){
            return new EventService();
        });

        $this->app->bind('response',function(){
            return new ResponseService();
        });

        $this->app->bind('auth',function(){
            return new AuthService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
