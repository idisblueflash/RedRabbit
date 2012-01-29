#!/usr/bin/perl -wT

use strict;
use CGI;

my $q = new CGI;
my $name = $q->param("search-key-editor");

my @pictures = ("apple", "banana", "pineapple", "apple pie");
my @found_pictures = grep(/$name/, @pictures);
#fullPageTest();
partPageTest();

sub partPageTest{
  print $q->header;
    if (@found_pictures){
      foreach(@found_pictures){
        print $q->p("found: $_!");
      }
    } else {
        print $q->p("Nothing found.");
    }
}       


