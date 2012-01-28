#!/usr/bin/perl -wT

use strict;
use CGI;

my $q = new CGI;
my $name = $q->param("search-key-editor");

# print $q->header("text/html"),
#       $q->start_html("Welcome"),
#       $q->p("Hi $name!"),
#       $q->end_html;

print $q->p("Hi $name!");
