<?php

namespace App\Contracts;

interface PaymentStrategyInterface
{
    public function processPayment(float $amount): string;
}
