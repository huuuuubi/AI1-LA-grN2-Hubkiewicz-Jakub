<?php
namespace App\Model;

use App\Service\Config;

class Student
{
    private ?int $id = null;
    private ?string $firstName = null;
    private ?string $lastName = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): Student
    {
        $this->id = $id;

        return $this;
    }

    public function getfirstName(): ?string
    {
        return $this->firstName;
    }

    public function setfirstName(?string $firstName): Student
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getlastName(): ?string
    {
        return $this->lastName;
    }

    public function setlastName(?string $lastName): Student
    {
        $this->lastName = $lastName;

        return $this;
    }

    public static function fromArray($array): Student
    {
        $post = new self();
        $post->fill($array);

        return $post;
    }

    public function fill($array): Student
    {
        if (isset($array['id']) && ! $this->getId()) {
            $this->setId($array['id']);
        }
        if (isset($array['firstName'])) {
            $this->setfirstName($array['firstName']);
        }
        if (isset($array['lastName'])) {
            $this->setlastName($array['lastName']);
        }

        return $this;
    }

    public static function findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM student';
        $statement = $pdo->prepare($sql);
        $statement->execute();

        $posts = [];
        $postsArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($postsArray as $postArray) {
            $posts[] = self::fromArray($postArray);
        }

        return $posts;
    }

    public static function find($id): ?Student
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM student WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $id]);

        $postArray = $statement->fetch(\PDO::FETCH_ASSOC);
        if (! $postArray) {
            return null;
        }
        $student = Student::fromArray($postArray);
        return $student;
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        if (! $this->getId()) {
            $sql = "INSERT INTO student (firstName, lastName) VALUES (:firstName, :lastName)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'firstName' => $this->getfirstName(),
                'lastName' => $this->getlastName(),
            ]);

            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE student SET firstName = :firstName, lastName = :lastName WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':firstName' => $this->getfirstName(),
                ':lastName' => $this->getlastName(),
                ':id' => $this->getId(),
            ]);
        }
    }

    public function delete(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = "DELETE FROM student WHERE id = :id";
        $statement = $pdo->prepare($sql);
        $statement->execute([
            ':id' => $this->getId(),
        ]);

        $this->setId(null);
        $this->setfirstName(null);
        $this->setlastName(null);
    }
}
