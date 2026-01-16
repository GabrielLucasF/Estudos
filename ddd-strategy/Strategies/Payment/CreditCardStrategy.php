<?php

namespace App\Strategies\Payment;

use App\Contracts\PaymentStrategyInterface;

class CreditCardStrategy implements PaymentStrategyInterface
{
    public function processPayment(float $amount): string
    {
        return "Credit Card payment processed! Amount: R$ " . number_format($amount, 2, ',', '.');
    }
}
