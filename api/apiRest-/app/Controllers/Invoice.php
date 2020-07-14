<?php

namespace App\Controllers;

use CodeIgniter\Controller;


class Invoice extends Controller
{
    public function api1()
    {
        return $this->response->setStatusCode(200)->setContentType('text/plain')->setBody('ingresa------');
    }
    public function api2()
    {
        return $this->response->setStatusCode(200)->setContentType('text/plain')->setBody('ingresa----+++++++--');
    }
}
