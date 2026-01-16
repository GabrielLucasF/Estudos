<?php

namespace App\Strategies\Payment;

use App\Contracts\PaymentStrategyInterface;

class BankSlipStrategy implements PaymentStrategyInterface
{
    private const BANK_SLIP_FEE = 1.50;

    public function processPayment(float $amount): string
    {
        $finalAmount = $amount + self::BANK_SLIP_FEE;

        return "Bank Slip payment processed! Amount: R$ " . number_format($finalAmount, 2, ',', '.');
    }
}
