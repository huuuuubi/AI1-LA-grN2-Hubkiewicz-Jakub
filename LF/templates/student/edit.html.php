<?php

/** @var \App\Model\Student $student */
/** @var \App\Service\Router $router */


$title = "Edit Student {$student->getfirstName()} ({$student->getId()})";
$bodyClass = "edit";

ob_start(); ?>
    <h1><?= $title ?></h1>
    <form action="<?= $router->generatePath('student-edit') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="student-edit">
        <input type="hidden" name="id" value="<?= $student->getId() ?>">
    </form>

    <ul class="action-list">
        <li>
            <a href="<?= $router->generatePath('student-index') ?>">Back to list</a></li>
        <li>
            <form action="<?= $router->generatePath('student-delete') ?>" method="post">
                <input type="submit" value="Delete" onclick="return confirm('Are you sure?')">
                <input type="hidden" name="action" value="student-delete">
                <input type="hidden" name="id" value="<?= $student->getId() ?>">
            </form>
        </li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
