#!/usr/bin/perl -wT

use strict;
use CGI;

my $q = new CGI;
my $name = $q->param("search-key-editor");

my @outputText;

#fullPageTest();
&searchPicturesJson($name);
#&searchPictures($name);
#&searchVideos($name);

#out put the results
print $q->header;
print &ulPackageJson();
#print &ulPackage();

# functions 
sub generate_random_string {
    my $res = '';
    $res.= chr int rand(26)+96 for 1..8;
    return $res;
}

sub searchPicturesJson{
  my $key = shift;
  my @pictures = ("apple", "banana", "pineapple", "apple pie");
  my @found_pictures = grep(/$key/, @pictures);

    if (@found_pictures){

      foreach(@found_pictures){
        my $id = generate_random_string();
        # print $q->p("found: $_!");
        my $image_caption = $_; 
        my $image_filename = $_ ;
        $image_filename =~ s/\ /_/g;
        push @outputText, "\t{id: id, describe: '$_', type: 'pictuers', filename: '../images/thumbnails/$image_filename'}";
      }
    } else {
      # nothing found.
    }
}       

sub ulPackageJson(){
    my $return = join(", \n", @outputText);
    $return = "[ \n"
    . $return 
    . "\n ]";
    return $return;
}

sub searchVideos{
  my $key = shift;
  my @videos= ("bad apple black and white", "apple introducing ipad 2");
  my @found_videos= grep(/$key/, @videos);

    push @outputText, "\t<li data-role=list-divider>Videos:</li>";
    if (@found_videos){

      foreach(@found_videos){
        # print $q->p("found: $_!");
        my $video_caption = $_; 
        my $video_filename = $_ ;
        $video_filename =~ s/\ /_/g;
        push @outputText, "\t<li><a href=''><img src=../images/thumbnails/$video_filename" . ".jpg class=ui-li-thumb> $_</a> </li>";
      }
    } else {
        # print $q->p("Nothing found.");
        push @outputText, "\t<li>Nothing found.</li>";
    }
}       

sub ulPackage(){
    my $return = join("\n", @outputText);
    $return = "<ul id=founds-list data-role=listview >\n"
    . $return 
    . "\n</ul>";
    return $return;
}

sub searchPictures{
  my $key = shift;
  my @pictures = ("apple", "banana", "pineapple", "apple pie");
  my @found_pictures = grep(/$key/, @pictures);

    push @outputText, "\t<li data-role=list-divider>Pictures:</li>";
    if (@found_pictures){

      foreach(@found_pictures){
        # print $q->p("found: $_!");
        my $image_caption = $_; 
        my $image_filename = $_ ;
        $image_filename =~ s/\ /_/g;
        push @outputText, "\t<li><a href=''><img src=../images/thumbnails/$image_filename" . ".jpg class=ui-li-thumb> $_</a> </li>";
      }
    } else {
        # print $q->p("Nothing found.");
        push @outputText, "\t<li>Nothing found.</li>";
    }
}       


