<?php

require_once __DIR__ . '/../vendor/autoload.php';

use App\Services\PaymentContext;
use App\Strategies\Payment\BankSlipStrategy;
use App\Strategies\Payment\CreditCardStrategy;
use App\Strategies\Payment\PixStrategy;
use InvalidArgumentException;


// Controller
$amount = 100.0;
$paymentType = 'credit_card'; // 'credit_card', 'bank_slip'

$strategy = match ($paymentType) {
    'pix' => new PixStrategy(),
    'credit_card' => new CreditCardStrategy(),
    'bank_slip' => new BankSlipStrategy(),
    default => throw new InvalidArgumentException("Invalid payment type: {$paymentType}"),
};

// Service
$paymentContext = new PaymentContext();
$paymentContext->setStrategy($strategy);
echo $paymentContext->executeStrategy($amount) . "\n";
