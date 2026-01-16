<?php

namespace App\Contracts;

interface TaxInterface
{
    public function calculate(float $value): float;
}