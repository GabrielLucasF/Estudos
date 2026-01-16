<?php

namespace App\Factories;

use App\Contracts\PaymentStrategyInterface;
use App\Strategies\Payment\PixStrategy;
use App\Strategies\Payment\CreditCardStrategy;
use App\Strategies\Payment\BankSlipStrategy;
use InvalidArgumentException;

class PaymentStrategyFactory
{
    private const STRATEGIES = [
        'pix' => PixStrategy::class,
        'credit_card' => CreditCardStrategy::class,
        'cartao' => CreditCardStrategy::class,
        'bank_slip' => BankSlipStrategy::class,
        'boleto' => BankSlipStrategy::class,
    ];

    public static function create(string $type): PaymentStrategyInterface
    {
        $type = strtolower($type);

        if (!isset(self::STRATEGIES[$type])) {
            throw new InvalidArgumentException("Invalid payment type: {$type}");
        }

        $strategyClass = self::STRATEGIES[$type];

        return new $strategyClass();
    }
}
