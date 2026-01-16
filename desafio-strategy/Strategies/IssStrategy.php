<?php

namespace App\Strategies;

use App\Contracts\TaxInterface;

class IssStrategy implements TaxInterface
{
    public function calculate(float $value): float
    {
        return ($value * 4) / 100;
    }
}