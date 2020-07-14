<?php

namespace App\Controllers;
use CodeIgniter\Controller;


class Ingreso extends Controller{

    public function ingresa(){
       return $this->response->setStatusCode(200)->setContentType('text/plain')->setBody('ingresa------');
    }

    public function registra()
    {
        return $this->response->setStatusCode(200)->setContentType('text/plain')->setBody('registra---------');
    }
}