<?php

namespace App\Factories;

use App\Contracts\ShippingStrategyInterface;
use App\Strategies\Shipping\PacStrategy;
use App\Strategies\Shipping\SedexStrategy;
use App\Strategies\Shipping\CarrierStrategy;
use App\Strategies\Shipping\PickupStrategy;
use InvalidArgumentException;

class ShippingStrategyFactory
{
    private const STRATEGIES = [
        'pac' => PacStrategy::class,
        'sedex' => SedexStrategy::class,
        'carrier' => CarrierStrategy::class,
        'transportadora' => CarrierStrategy::class,
        'pickup' => PickupStrategy::class,
        'retirada' => PickupStrategy::class,
    ];

    public static function create(string $type): ShippingStrategyInterface
    {
        $type = strtolower($type);

        if (!isset(self::STRATEGIES[$type])) {
            throw new InvalidArgumentException("Invalid shipping type: {$type}");
        }

        $strategyClass = self::STRATEGIES[$type];

        return new $strategyClass();
    }
}
