<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Services\ShippingContext;
use App\Strategies\Shipping\PacStrategy;
use App\Strategies\Shipping\CarrierStrategy;
use App\Strategies\Shipping\PickupStrategy;
use App\Strategies\Shipping\SedexStrategy;
use InvalidArgumentException;

//controller
$orderTotal = 100.0;
$distanceInKm = 50.0;
$shippingType = 'sedex'; // 'pac', 'carrier', 'pickup'

$strategy = match ($shippingType) {
    'sedex' => new SedexStrategy(),
    'pac' => new PacStrategy(),
    'carrier' => new CarrierStrategy(),
    'pickup' => new PickupStrategy(),
    default => throw new InvalidArgumentException("Invalid shipping type: {$shippingType}"),
};

//service
$shippingContext = new ShippingContext();
$shippingContext->setStrategy($strategy);
$shippingCost = $shippingContext->executeStrategy($distanceInKm);

echo "Shipping type: {$shippingType}\n";
echo "Order total: R$ {$orderTotal}\n";
echo "Distance: {$distanceInKm} km\n";
echo "Shipping cost: R$ {$shippingCost}\n";
