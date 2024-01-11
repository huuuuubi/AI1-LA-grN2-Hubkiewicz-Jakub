<?php

/** @var Student $student */
/** @var Router $router */

use App\Model\Student;
use App\Service\Router;

$title = "{$student->getfirstName()}+{$student->getlastName()}";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $student->getfirstName() ?> <?= $student->getlastName() ?></h1>
    <article>
        <?= $student->getId();?>
    </article>

    <ul class="action-list">
        <li> <a href="<?= $router->generatePath('student-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('student-edit', ['id'=> $student->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
