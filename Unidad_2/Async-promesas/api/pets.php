<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "petshop";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "conexion mala", $conn->connect_error]));
}

$method = $_SERVER["REQUEST_METHOD"];
switch ($method) {
    case "GET":
        $id = $_GET["id"] ?? null;
        if ($id) {
            $stnt = $conn->prepare("SELECT pets.*, clientes.nombre AS nombreDueno FROM pets JOIN clientes ON pets.idDueño = clientes.id WHERE pets.id=?");
            $stnt->bind_param("s", $id);
            $stnt->execute();
            $result = $stnt->get_result();
            $pet = $result->fetch_assoc();
            echo json_encode($pet);
        } else {
            $result = $conn->query("SELECT pets.*, clientes.nombre AS nombreDueno FROM pets JOIN clientes ON pets.idDueño = clientes.id");
            $pets = [];
            while ($row = $result->fetch_assoc()) {
                $pets[] = $row;
            }
            echo json_encode($pets);
        }
        break;

    case "POST":
        $input = json_decode(file_get_contents("php://input"), true);
        $id=$input["id"] ?? rand(100000, 999999);
        $nombre = $input["nombre"];
        $edad = $input["edad"];
        $raza = $input["raza"];
        $peso = $input["peso"];
        $idDueño = $input["idDueño"];
        $stnt = $conn->prepare("INSERT INTO pets (id, nombre, edad, raza, peso, idDueño) VALUES (?, ?, ?, ?, ?, ?)");
        $stnt->bind_param("ssisss", $id, $nombre, $edad, $raza, $peso, $idDueño);
        if ($stnt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "creado exitosamente", "id" => $id]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "error al crear"]);
        }
        break;

    case "PUT":
        $input = json_decode(file_get_contents("php://input"), true);
        $id = $input["id"];
        $nombre = $input["nombre"];
        $edad = $input["edad"];
        $raza = $input["raza"];
        $peso = $input["peso"];
        $idDueño = $input["idDueño"];
        $stnt = $conn->prepare("UPDATE pets SET nombre=?, edad=?, raza=?, peso=?, idDueño=? WHERE id=?");
        $stnt->bind_param("sisdii", $nombre, $edad, $raza, $peso, $idDueño, $id);
        if ($stnt->execute()) {
            http_response_code(200);
            echo json_encode(["message" => "actualizado exitosamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "error al actualizar"]);
        }
        break;

    case "DELETE":
        $id = $_GET["id"] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(["error" => "id requerido"]);
            break;
        }
        $stnt = $conn->prepare("DELETE FROM pets WHERE id=?");
        $stnt->bind_param("s", $id);
        if ($stnt->execute()) {
            echo json_encode(["message" => "eliminado exitosamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "error al eliminar"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "todo mal"]);
        break;
}

$conn->close();
?>