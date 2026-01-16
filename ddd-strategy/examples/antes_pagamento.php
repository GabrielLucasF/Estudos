<?php

$amount = 100.0;
$paymentType = 'pix'; // 'cartao', 'boleto'

function processarPagamento(string $tipo, float $valor): string
{
    if ($tipo === 'pix') {
        $desconto = $valor * 0.10;
        $valorFinal = $valor - $desconto;
        return "Pagamento via PIX realizado! Valor: R$ {$valorFinal}";
    }

    if ($tipo === 'cartao') {
        return "Pagamento via Cartão realizado! Valor: R$ {$valor}";
    }

    if ($tipo === 'boleto') {
        $taxa = 1.50;
        $valorFinal = $valor + $taxa;
        return "Pagamento via Boleto realizado! Valor: R$ {$valorFinal}";
    }

    throw new InvalidArgumentException('Tipo de pagamento inválido');
}

echo processarPagamento($paymentType, $amount) . "\n";
