<?php

namespace App\Strategies\Shipping;

use App\Contracts\ShippingStrategyInterface;

class PickupStrategy implements ShippingStrategyInterface
{
    public function calculateShippingCost(float $distanceInKm): float
    {
        $this->validateDistance($distanceInKm);

        return 0.0;
    }

    public function validateDistance(float $distanceInKm): void
    {
        if ($distanceInKm < 0) {
            throw new InvalidArgumentException('Distance must be greater than or equal to zero');
        }
    }
}
