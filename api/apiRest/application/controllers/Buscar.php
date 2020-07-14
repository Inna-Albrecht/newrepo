<?php
defined('BASEPATH') or exit('No direct script access allowed');

require_once(APPPATH . '/libraries/REST_Controller.php');

use Restserver\libraries\REST_Controller;


class Buscar extends REST_Controller
{


	public function __construct()
	{

		header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
		header("Access-Control-Allow-Headers: Content-Type, Content-Length, Accept-Encoding");
		header("Access-Control-Allow-Origin: *");


		parent::__construct();
		$this->load->database();
	}


	public function index_post()
	{
		$data = $this->post();


		if (isset($data['name'])&& isset($data['id'])) {

			$todos = array();
			// LIKE
			$name = "name";
			$query = $this->db->query("SELECT * FROM `users` where name like '%" . $data['name'] . "%'");

			foreach ($query->result() as $row) {
				$f = "";
				$profile = $this->db->query('SELECT * FROM `users_photos` where u_id = ' . $row->id);
				foreach ($profile->result()  as $foto) {
					if ($foto->profile === "1" && $data['id']!== $row->id) {
						$f = $foto->photo;
						$orden = array(
							'id' => $row->id,
							'name' => $row->name,
							'photo_profile' => $f
						);

						array_push($todos, $orden);
					}
				}
			}
			$respuesta = array(
				'error' => false,
				'termino' => $data['name'],
				'usuarios' => $todos
			);
			$this->response($respuesta);
		} else {
			$respuesta = array(
				'error' => true,
				'termino' => "vacio",
			);
			$this->response($respuesta);
		}
	}
}
