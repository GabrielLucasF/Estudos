<?php

namespace App\Services;

use App\Contracts\PaymentStrategyInterface;

class PaymentContext
{
    private PaymentStrategyInterface $paymentStrategyInterface;

    public function setStrategy(PaymentStrategyInterface $paymentStrategyInterface): void
    {
        $this->paymentStrategyInterface = $paymentStrategyInterface;
    }

    public function executeStrategy(float $amount): string
    {
        return $this->paymentStrategyInterface->processPayment($amount);
    }
}
