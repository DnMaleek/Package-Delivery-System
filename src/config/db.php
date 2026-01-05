<?php

require __DIR__ . '/../../vendor/autoload.php';

use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
$dotenv->load();

$required = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASS'];
foreach ($required as $var) {
    if (!isset($_ENV[$var])) {
        die("Missing environment variable: $var");
    }
}

$dsn = sprintf(
    "mysql:host=%s;dbname=%s;port=%s;charset=utf8mb4",
    $_ENV['DB_HOST'],
    $_ENV['DB_NAME'],
    $_ENV['DB_PORT'] ?? 3306
);

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO(
        $dsn,
        $_ENV['DB_USER'],
        $_ENV['DB_PASS'],
        $options
    );
} catch (PDOException $e) {
    error_log($e->getMessage());
    die("Database connection failed.");
}
