<?php
    /** @var $student ?Student */

use App\Model\Student;

?>

<div class="form-group">
    <label for="subject">ID</label>
    <input type="text" id="id" name="student[id]" value="<?= $student ? $student->getId() : '' ?>">
</div>

<div class="form-group">
    <label for="content">First name</label>
    <input type="text" id="id" name="student[firstName]"><?= $student? $student->getfirstName() : '' ?>
</div>

<div class="form-group">
    <label for="content">Last name</label>
    <input type="text" id="id" name="student[lastName]"><?= $student? $student->getlastName() : '' ?>
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>
