<?php

namespace App\Strategies;

use App\Contracts\TaxInterface;

class IcmsStrategy implements TaxInterface
{
    public function calculate(float $value): float
    {
        return ($value * 11) / 100;
    }
}