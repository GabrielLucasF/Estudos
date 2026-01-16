<?php

namespace Alura\DesignPattern\Impostos;

use Alura\DesignPattern\Orcamento;

interface ImpostoInterface
{
    public function calculaImposto(Orcamento $orcamento): float;
}
