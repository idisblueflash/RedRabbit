#!/usr/bin/perl -wT

use strict;
use CGI;

my $q = new CGI;
my $name = $q->param("search-key-editor");

#fullPageTest();
partPageTest();

sub partPageTest{
  print $q->header,
       $q->p("Hi $name!");
}       

sub fullPageTest{
  print $q->header("text/html"),
       $q->start_html("Welcome"),
       $q->p("Hi $name!"),
       $q->end_html;
}       

