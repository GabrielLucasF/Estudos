<?php

namespace App\Strategies;

use App\Contracts\TaxInterface;

class ConfinsStrategy implements TaxInterface
{
    public function calculate(float $value): float
    {
        return ($value * 15) / 100;
    }
}