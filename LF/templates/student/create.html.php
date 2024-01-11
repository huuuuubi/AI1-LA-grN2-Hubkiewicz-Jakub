<?php

/** @var Student $student */
/** @var Router $router */

use App\Model\Student;
use App\Service\Router;

$title = 'Create student';
$bodyClass = "edit";

ob_start(); ?>
    <h1>Create Student</h1>
    <form action="<?= $router->generatePath('student-create') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="student-create">
    </form>

    <a href="<?= $router->generatePath('student-index') ?>">Back to list</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
