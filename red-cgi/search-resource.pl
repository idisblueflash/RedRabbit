#!/usr/bin/perl -wT

use strict;
use CGI;

my $q = new CGI;
my $name = $q->param("search-key-editor");

my @outputText;

#fullPageTest();
searchPictures();
searchVideos();

#out put the results
print $q->header;
print $ulPackage();

# functions 
sub searchVideos{
  my @videos= ("bad apple black and white", "apple Introducing ipad 2");
  my @found_videos= grep(/$name/, @videos);

    if (@found_videos){
      push @outputText, "<li data-role=list-divider>Videos:</li>";

      foreach(@found_videos){
        # print $q->p("found: $_!");
        my $video_caption = $_; 
        my $video_filename = $_ ;
        $video_filename =~ s/\ /_/g;
        push @outputText, "<li><a href=''><img src=../images/thumbnails/$video_filename" . ".jpg class=ui-li-thumb> $_</a> </li>";
      }
    } else {
        # print $q->p("Nothing found.");
        push @outputText, "<li>Nothing found.</li>";
    }
}       

sub ulPackage(){
    my $return = join(" ", @outputText);
    $return = "<ul id=videos-list data-role=listview >"
    . $return 
    . "</ul>";
    return $return;
}

sub searchPictures{
  my @pictures = ("apple", "banana", "pineapple", "apple pie");
  my @found_pictures = grep(/$name/, @pictures);

    if (@found_pictures){
      push @outputText, "<li data-role=list-divider>Pictures:</li>";

      foreach(@found_pictures){
        # print $q->p("found: $_!");
        my $image_caption = $_; 
        my $image_filename = $_ ;
        $image_filename =~ s/\ /_/g;
        push @outputText, "<li><a href=''><img src=../images/thumbnails/$image_filename" . ".jpg class=ui-li-thumb> $_</a> </li>";
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


