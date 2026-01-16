<?php

namespace App\Services;

use App\Contracts\ShippingStrategyInterface;

class ShippingContext
{
    private ShippingStrategyInterface $shippingStrategyInterface;

    public function setStrategy(ShippingStrategyInterface $shippingStrategyInterface): void
    {
        $this->shippingStrategyInterface = $shippingStrategyInterface;
    }
    public function executeStrategy(float $distanceInKm): float
    {
        return $this->shippingStrategyInterface->execute($distanceInKm);
    }
}
