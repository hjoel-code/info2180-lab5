<?php
$host = 'localhost';
$username = 'lab5_user';
$password = 'password123';
$dbname = 'world';

$conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
$stmt = $conn->query("SELECT * FROM countries");
$context = $_GET["context"];
$country = $_GET["country"];


if ($context == "COUNTRY") {
  $stmt = $conn->query("SELECT * FROM countries WHERE name LIKE '%$country%'");
  $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
} else {
  $stmt = $conn->query("SELECT code FROM countries WHERE name LIKE '%$country%' ");
  $country_code = $stmt->fetch(PDO::FETCH_ASSOC)["code"];

  $stmt = $conn->query("SELECT * FROM cities WHERE country_code LIKE '%$country_code%' ");
  $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
}

?>

<?php if ($context == 'COUNTRY'): ?>

  <thead>
    <th>Name</th>
    <th>Continent</th>
    <th>Independence</th>
    <th>Head of State</th>
  </thead>
  <tbody>
  <?php foreach ($results as $row): ?>
    <tr>
      <td><?= $row['name'] ?></td>
      <td><?= $row['continent'] ?></td>
      <td><?= $row['independence_year'] ?></td>
      <td><?= $row['head_of_state'] ?></td>
    </tr>
  <?php endforeach; ?> 
  </tbody>
<?php else: ?>

  <thead>
    <th>Name</th>
    <th>District</th>
    <th>Population</th>
  </thead>
  <tbody>
  
  <?php foreach ($results as $row): ?>
    <tr>
      <td><?= $row['name'] ?></td>
      <td><?= $row['district'] ?></td>
      <td><?= $row['population'] ?></td>
    </tr>
  <?php endforeach; ?> 
  </tbody>
<?php endif; ?>

