#!/usr/bin/perl -wT

use strict;
use CGI;

my $q = new CGI;
my $name = $q->param("search-key-editor");

my @outputText;

#fullPageTest();
my $picParts = searchPictures();

#out put the results
print $q->header;
print $picParts;

sub searchPictures{
  my @pictures = ("apple", "banana", "pineapple", "apple pie");
  my @found_pictures = grep(/$name/, @pictures);

    if (@found_pictures){
      foreach(@found_pictures){
        # print $q->p("found: $_!");
        push @outputText, "<li><a href=''> $_</a> </li>";
      }
    } else {
        # print $q->p("Nothing found.");
        push @outputText, "<li>Nothing found.</li>";
    }
    my $return = join(" ", @outputText);
    $return = "<ul id=pictures-list data-role=listview >"
    . $return 
    . "</ul>";
    return $return;
}       


