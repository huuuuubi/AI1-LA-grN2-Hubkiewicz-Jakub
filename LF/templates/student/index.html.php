<?php

/** @var Student[] $students = Student::findAll() */
/** @var Router $router */

use App\Model\Student;
use App\Service\Router;
$students = Student::findAll();
$title = 'Student List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Students List</h1>

    <a href="<?= $router->generatePath('student-create') ?>">Create new</a>

    <ul class="index-list">
        <?php foreach ($students as $student): ?>
            <li><h3><?= $student->getfirstName() ?> <?= $student->getlastName() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('student-show', ['id' => $student->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('student-edit', ['id' => $student->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
