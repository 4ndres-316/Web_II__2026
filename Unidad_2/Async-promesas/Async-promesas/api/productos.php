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
            $stnt = $conn->prepare("SELECT * FROM productos WHERE id=?");
            $stnt->bind_param("s", $id);
            $stnt->execute();
            $result = $stnt->get_result();
            $producto = $result->fetch_assoc();
            echo json_encode($producto);
        } else {
            $result = $conn->query("SELECT * FROM productos");
            $productos = [];
            while ($row = $result->fetch_assoc()) {
                $productos[] = $row;
            }
            echo json_encode($productos);
        }
        break;

    case "POST":
        $input = json_decode(file_get_contents("php://input"), true);
        $id=$input["id"] ?? rand(100000, 999999);
        $nombre = $input["nombre"];
        $precio = $input["precio"];
        $descripcion = $input["descripcion"];
        $stnt = $conn->prepare("INSERT INTO productos (id, nombre, precio, descripcion) VALUES (?, ?, ?, ?)");
        $stnt->bind_param("ssds", $id, $nombre, $precio, $descripcion);
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
        $precio = $input["precio"];
        $descripcion = $input["descripcion"];
        $stnt = $conn->prepare("UPDATE productos SET nombre=?, precio=?, descripcion=? WHERE id=?");
        $stnt->bind_param("sdss", $nombre, $precio, $descripcion, $id);
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
        $stnt = $conn->prepare("DELETE FROM productos WHERE id=?");
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
        echo json_encode(["error" => "método no permitido"]);
        break;
}

$conn->close();
?>