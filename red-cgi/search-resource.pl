#!/usr/bin/perl -wT

use strict;
use CGI;

my $q = new CGI;
my $name = $q->param("search-key-editor");

my @outputText;

#<!-- Main -->
my @pictures = ("apple", "banana", "pineapple", "apple pie");
&searchResource($name, "pictures", @pictures);
my @videos= ("bad apple black and white", "apple introducing ipad 2");

#<!-- out put the results-->
print $q->header;
print &ulPackageJson();

# functions 
sub generate_random_string {
    my $res = '';
    $res.= chr int rand(26)+96 for 1..8;
    return $res;
}

# searchResource()
#
# search in resource then return in json format
#
# $key    - key words to find
# $type   - type of words
# @dicts  - words list which need to find in.
# 
# example:
#  searchResource($key, $type, @dicts);
# Returns:
#  json obj 
sub searchResource{
  my $key = shift;
  my $type = shift;
  my @dicts = @_;
  my @found_items = grep(/$key/, @dicts);

    if (@found_items){

      foreach(@found_items){
        my $id = generate_random_string();
        # print $q->p("found: $_!");
        my $image_caption = $_; 
        my $image_filename = $_ ;
        $image_filename =~ s/\ /_/g;
        push @outputText, "\t{\"id\": \"$id\", \"describe\": \"$_\", \"type\": \"$type\", \"filename\": \"../images/thumbnails/$image_filename\"}";
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
