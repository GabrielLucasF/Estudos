<?php

namespace App\Services\Context;

use App\Contracts\TaxInterface;

class TaxContext
{
    public function __construct(private TaxInterface $strategy)
    {
        //
    }

    public function setStrategy(TaxInterface $strategy): void
    {
        $this->strategy = $strategy;
    }

    public function calculate(float $value): float
    {
        return $this->strategy->calculate($value);
    }
}