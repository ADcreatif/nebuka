<?php
function scan_dir($directory) {
    $js_files = array_diff(scandir($directory), ['.', '..']);
    foreach ($js_files as $file) {
        if (is_dir($directory . '/' . $file)) {
            scan_dir($directory . '/' . $file);
        } else {
            echo "\n<script src='$directory/$file'></script>";
        }
    }
}

scan_dir("classes");
