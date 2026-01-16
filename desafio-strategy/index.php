<?php

$valor = 100;
$imposto = 'ISS'; // Mude Para: 'ICMS', 'PIS'

function calcularImposto(string $imposto, float $valor): float
{
    if ($imposto === 'ISS') {
        return ($valor * 4) / 100;
    }

    if ($imposto === 'ICMS') {
        return ($valor * 11) / 100;
    }

    if ($imposto === 'PIS') {
        return ($valor * 15) / 100;
    }

    throw new InvalidArgumentException('Tipo de imposto inválido');
}

$imposto = calcularImposto($imposto, $valor);
echo "Imposto: " . $imposto;