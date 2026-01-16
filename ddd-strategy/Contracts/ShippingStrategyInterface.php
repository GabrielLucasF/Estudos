<?php

namespace App\Contracts;

interface ShippingStrategyInterface
{
    public function calculateShippingCost(float $distanceInKm): float;

    public function validateDistance(float $distanceInKm): void;
}
