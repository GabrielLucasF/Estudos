<?php

namespace App\Strategies\Shipping;

use App\Contracts\ShippingStrategyInterface;

class PacStrategy implements ShippingStrategyInterface
{
    private const BASE_FEE = 10.0;
    private const FEE_PER_KM = 0.10;

    public function calculateShippingCost(float $distanceInKm): float
    {
        $this->validateDistance($distanceInKm);

        return self::BASE_FEE + (self::FEE_PER_KM * $distanceInKm);
    }

    public function validateDistance(float $distanceInKm): void
    {
        if ($distanceInKm < 0) {
            throw new InvalidArgumentException('Distance must be greater than or equal to zero');
        }
    }
}
