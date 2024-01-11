<?php
namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\Post;
use App\Model\Student;
use App\Service\Router;
use App\Service\Templating;

class StudentController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $student = Student::findAll();
        $html = $templating->render('student/index.html.php', [
            'student' => $student,
            'router' => $router,
        ]);
        return $html;
    }

    public function createAction(?array $requestPost, Templating $templating, Router $router): ?string
    {
        if ($requestPost) {
            $student = Student::fromArray($requestPost);
            // @todo missing validation
            $student->save();

            $path = $router->generatePath('student-index');
            $router->redirect($path);
            return null;
        } else {
            $student = new Student();
        }

        $html = $templating->render('student/create.html.php', [
            'student' => $student,
            'router' => $router,
        ]);
        return $html;
    }

    public function editAction(int $studentId, ?array $requestStudent, Templating $templating, Router $router): ?string
    {
        $student = Student::find($studentId);
        if (! $student) {
            throw new NotFoundException("Missing student with id $studentId");
        }

        if ($requestStudent) {
            $student->fill($requestStudent);
            // @todo missing validation
            $student->save();

            $path = $router->generatePath('student-index');
            $router->redirect($path);
            return null;
        }

        $html = $templating->render('student/edit.html.php', [
            'student' => $student,
            'router' => $router,
        ]);
        return $html;
    }

    public function showAction(int $studentId, Templating $templating, Router $router): ?string
    {
        $student = Student::find($studentId);
        if (! $student) {
            throw new NotFoundException("Missing student with id $studentId");
        }

        $html = $templating->render('student/show.html.php', [
            'student' => $student,
            'router' => $router,
        ]);
        return $html;
    }

    public function deleteAction(int $studentId, Router $router): ?string
    {
        $student = Student::find($studentId);
        if (! $student) {
            throw new NotFoundException("Missing student with id $studentId");
        }

        $student->delete();
        $path = $router->generatePath('student-index');
        $router->redirect($path);
        return null;
    }
}
