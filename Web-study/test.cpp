#include <iostream>
#include <cstdlib>
using namespace std;
 
struct IP
{
    int a,b,c,d;
    bool operator ==(const IP &ip )
    {
        return (a==ip.a&&b==ip.b&&c==ip.c&&d==ip.d);
    }
};
 
bool judge(string s ,IP & ip)
{
    int pos=0;
    ip.a=atoi(&s[pos]);
    if(ip.a>255) return false;
     
    pos=s.find_first_of('.',pos);
    pos++;
    ip.b=atoi(&s[pos+1]);
    if(ip.b>255) return false;
     
    pos=s.find_first_of('.',pos+1);
    ip.c=atoi(&s[pos+1]);
    if(ip.c>255) return false;
     
    pos=s.find_first_of('.',pos+1);
    ip.d=atoi(&s[pos+1]);
    if(ip.d>255)return false;
    return true;
     
}
 
int main()
{
     
    string s1,s2,s3;
    while(  cin>>s2>>s3>>s1)
    {
        IP t1,t2,t3;
        if(judge(s1,t1)&&judge(s2,t2)&&judge(s3,t3))
        {
            t2.a=t2.a&t1.a;
            t2.b=t2.a&t1.b;
            t2.c=t2.a&t1.c;
            t2.d=t2.a&t1.d;
             
            t3.a=t3.a&t1.a;
            t3.b=t3.a&t1.b;
            t3.c=t3.a&t1.c;
            t3.d=t3.a&t1.d;
            
            // cout<<t2.a;
            cout<<t2.d;
            cout<<t3.d;
            // cout<<t2.c;
            // cout<<t2.d;
            if(t2==t3) cout<<0<<endl;
            else cout<<2<<endl;
        }
        else
        {
            cout<<1<<endl;
        }
    }
 
     
    return 0;
}
