<?php

namespace App\Strategies\Payment;

use App\Contracts\PaymentStrategyInterface;

class PixStrategy implements PaymentStrategyInterface
{
    private const DISCOUNT_PERCENTAGE = 0.10;

    public function processPayment(float $amount): string
    {
        $finalAmount = $this->applyDiscount($amount);

        return "PIX payment processed! Amount: R$ " . number_format($finalAmount, 2, ',', '.');
    }

    private function applyDiscount(float $amount): float
    {
        return $amount * (1 - self::DISCOUNT_PERCENTAGE);
    }
}
