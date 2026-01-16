<?php

require_once __DIR__ . '/vendor/autoload.php';

use App\Strategies\ConfinsStrategy;
use App\Strategies\IssStrategy;
use App\Strategies\IcmsStrategy;
use App\Strategies\PisStrategy;
use App\Services\Context\TaxContext;

$value = 100;
$tax = 'COFINS';

$strategy = match ($tax) {
    'ISS' => new IssStrategy(),
    'ICMS' => new IcmsStrategy(),
    'PIS' => new PisStrategy(),
    'COFINS' => new ConfinsStrategy(),
};

$context = new TaxContext($strategy);

$tax = $context->calculate($value);

echo "Valor da taxa: $tax\n";
