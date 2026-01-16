<?php

$orderTotal = 100.0;
$distanceInKm = 50.0;
$shippingType = 'sedex'; // 'pac', 'transportadora', 'retirada'

function calcularFrete(string $tipo, float $distanceInKm): float
{
    if ($tipo === 'pac') {
        return 10 + (0.1 * $distanceInKm);
    }

    if ($tipo === 'sedex') {
        return 20 + (0.2 * $distanceInKm);
    }

    if ($tipo === 'transportadora') {
        return 15 + (0.15 * $distanceInKm);
    }

    if ($tipo === 'retirada') {
        return 0;
    }

    throw new InvalidArgumentException('Tipo de frete inválido');
}

$shippingCost = calcularFrete($shippingType, $distanceInKm);

echo "Shipping type: {$shippingType}\n";
echo "Order total: R$ {$orderTotal}\n";
echo "Distance: {$distanceInKm} km\n";
echo "Shipping cost: R$ {$shippingCost}\n";
