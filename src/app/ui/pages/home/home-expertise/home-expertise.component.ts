import { ScrollDispatcher, ViewportRuler } from '@angular/cdk/scrolling';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { ReplaySubject, takeUntil, startWith, map, scan, distinctUntilChanged, takeWhile, switchMap, Observable } from 'rxjs';
import { TRANSITION_IMAGE_SCALE, TRANSITION_TEXT } from 'src/app/ui/animations/transitions/transitions.constants';
import { UiUtilsView } from 'src/app/ui/utils/views.utils';

@Component({
  selector: 'app-home-expertise',
  templateUrl: './home-expertise.component.html',
  styleUrls: ['./home-expertise.component.scss'],
  animations: [
    TRANSITION_TEXT,
    TRANSITION_IMAGE_SCALE
  ]
})
export class HomeExpertiseComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  mOnceAnimated = false

  /* ********************************************************************************************
    *                anims
    */
  _mTriggerAnim?= 'false'

  _mTriggerImage?= 'false'


  _mThreshold = 0.2


  @ViewChild('animRefView') vAnimRefView?: ElementRef<HTMLElement>;

  constructor(public el: ElementRef,
    private _ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public mediaObserver: MediaObserver,
    private scroll: ScrollDispatcher, private viewPortRuler: ViewportRuler) { }

  ngOnInit(): void {
  }



  ngAfterViewInit(): void {
    this.setupAnimation();
  }

  ngOnDestroy(): void {

    this.destroyed$.next(true)
    this.destroyed$.complete()
  }


  public setupAnimation() {
    if (!this.vAnimRefView) return;

    // console.info("home products setupAnimation: " )
    this.scroll.ancestorScrolled(this.vAnimRefView, 100).pipe(
      // Makes sure to dispose on destroy
      takeUntil(this.destroyed$),
      startWith(0),
      map(() => {
        if (this.vAnimRefView != null) {
          var visibility = UiUtilsView.getVisibility(this.vAnimRefView, this.viewPortRuler)
          // console.log("product app-item UiUtilsView visibility: ", visibility)
          return visibility;
        }
        return 0;

      }),
      scan<number, boolean>((acc: number | boolean, val: number) => (val >= this._mThreshold || (acc ? val > 0 : false))),
      // Distincts the resulting triggers 
      distinctUntilChanged(),
      // Stop taking the first on trigger when aosOnce is set
      takeWhile(trigger => {
        // console.info("app-item  !trigger || !this.mOnceAnimated",
        //   !trigger || !this.mOnceAnimated)

        return !trigger || !this.mOnceAnimated
      }, true),
      switchMap(trigger => new Observable<number | boolean>(observer => this._ngZone.run(() => observer.next(trigger))))
    ).subscribe(val => {


      // console.log("home-item setupAnimation ancestorScrolled: ", val)

      if (this.mOnceAnimated) {
        return;
      }

      if (val) {
        // console.log("HomeProductsComponent setupAnimation setupAnimation ancestorScrolled: ", val)

        this.mOnceAnimated = true
        this._mTriggerAnim = 'true'
        this.cdr.detectChanges()
      }
      // if (this.vImageArea != null) {
      //   var visibility = UiUtilsView.getVisibility(this.vImageArea, this.viewPortRuler)
      //   console.log("UiUtilsView visibility: ", visibility)
      // }
    }

    )
  }

  _mTools = [

    // design
    //{
    //  "id": "5131",
    //  "name": "Figma",
    //  "logo": "assets/img/tools/figma.svg",
    //  "link": "https://www.figma.com/",
    //  "tab": "design"
    //},
    //{
    //  "id": "5131",
    //  "name": "Adobe XD",
    //  "logo": "assets/img/tools/xd.png",
    //  "link": "https://www.adobe.com/products/xd.html",
    //  "tab": "design"
    //},

    {
      "id": "5132",
      "name": "Adobe Photoshop",
      "logo": "assets/img/tools/ps.png",
      "link": "https://www.adobe.com/products/photoshop.html",
      "tab": "design",
      "color": "#001E36",
    },
    //{
    //  "id": "5133",
    //  "name": "Adobe Illustrator",
    //  "logo": "assets/img/tools/ai.svg",
    //  "link": "https://www.adobe.com/products/illustrator.html",
    //  "tab": "design"
    //},
    //{
    //  "id": "5134",
    //  "name": "Ink Scape",
    //  "logo": "assets/img/tools/inkscape-logo.svg",
    //  "link": "https://inkscape.org/",
    //  "tab": "design"
    //},



    // android
    //{
    //  "id": "9110",
    //  "name": "Power Apps",
    //  "logo": "assets/img/tools/android.svg",
    //  "link": "https://www.microsoft.com/en-us/power-platform/products/power-apps",
    //  "tab": "android",
    //},
    {
      "id": "9112",
      "name": "Logic Apps",
      "logo": "assets/img/tools/logicapps.png",
      "link": "https://azure.microsoft.com/en-us/products/logic-apps",
      "tab": "android",
    },
    {
      "id": "9113",
      "name": "PowerBi",
      "logo": "assets/img/tools/powerbi.png",
      "link": "https://www.microsoft.com/en-us/download/details.aspx?id=58494",
      "tab": "android",
      "color": "#F2C80F"
    },
    {
      "id": "9114",
      "name": "Power Apps",
      "logo": "assets/img/tools/powerapps.png",
      "link": "https://www.microsoft.com/en-us/power-platform/products/power-apps",
      "tab": "android",
      "color":"#742774"
    },
    //{
    //  "id": "9115",
    //  "name": "Architecture Components",
    //  "logo": "assets/img/tools/pic_architecture_components.png",
    //  "link": "https://developer.android.com/topic/architecture",
    //  "tab": "android"
    //},
//    {
//      "id": "9116",
//      "name": "Kotlin",
//      "logo": "assets/img/tools/kotlin-logo.png",
//      "link": "https://kotlinlang.org/",
//      "tab": "android"
//    },

//    // cross
//{
//      "id": "4101",
//      "name": "Flutter",
//      "logo": "assets/img/tools/flutter_logo.svg",
//      "link": "https://flutter.dev/",
//      "tab": "Cross",
//      "color": "#42A5F5"
//    },

    // web



    {
      "id": "8102",
      "name": "VirtualBox",
      "logo": "assets/img/tools/vb.png",
      "link": "https://www.virtualbox.org/wiki/Downloads",
      "tab": "web",
      "color": "#183A61"
    },

    {
      "id": "8103",
      "name": "VMWare",
      "logo": "assets/img/tools/vm.jpeg",
      "link": "https://blogs.vmware.com/workstation/2024/05/vmware-workstation-pro-now-available-free-for-personal-use.html",
      "tab": "web",
      "color":"#607078"
    },
    //{
    //  "id": "8105",
    //  "name": "HighCharts js",
    //  "logo": "assets/img/tools/highchart-logo.png",
    //  "link": "https://www.highcharts.com/",
    //  "tab": "web"
    //},
    //{
    //  "id": "8108",
    //  "name": "Sass",
    //  "logo": "assets/img/tools/sass-logo.svg",
    //  "link": "https://sass-lang.com/",
    //  "tab": "web",
    //  "color": "#CF649A"
    //},
    //{
    //  "id": "8106",
    //  "name": "D3 js",
    //  "logo": "assets/img/tools/d3.svg",
    //  "link": "https://d3js.org/",
    //  "tab": "web"
    //},
    //{
    //  "id": "8104",
    //  "name": "Ngrx",
    //  "logo": "assets/img/tools/ngrx.svg",
    //  "link": "https://ngrx.io/",
    //  "tab": "web"
    //},
    {
      "id": "8101",
      "name": "Angular",
      "logo": "assets/img/tools/angular.png",
      "link": "https://angular.io/",
      "tab": "web",
      "color": "#FF4369"
    },
    {
      "id": "8109",
      "name": "dotNet",
      "logo": "assets/img/tools/.net.png",
      "link": "https://dotnet.microsoft.com/en-us/download/dotnet-framework",
      "tab": "web",
      "color":"#512BD4"
    },

    // backend

    {
      "id": "7121",
      "name": "SSMS",
      "logo": "assets/img/tools/sql.png",
      "link": "https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16",
      "tab": "back-end",
      "color":"#A91D22"
    },
    {
      "id": "7122",
      "name": "Power Automate",
      "logo": "assets/img/tools/pa.png",
      "link": "http://docs.sequelizejs.com/",
      "tab": "back-end",
      "color": "#0061F2"
    },

    {
      "id": "7126",
      "name": "Dataverse",
      "logo": "assets/img/tools/dv.jpeg",
      "link": "https://nodejs.org/en/",
      "tab": "back-end",
      "color": "#1D4A75"
    },

    {
      "id": "7126",
      "name": "Sharepoint",
      "logo": "assets/img/tools/sp.png",
      "link": "https://nodejs.org/en/",
      "tab": "back-end",
      "color": "#0078D4"
    },

    // cloud

    {
      "id": "6121",
      "name": "Firebase",
      "logo": "assets/img/tools/firebase.svg",
      "link": "https://firebase.google.com/",
      "tab": "cloud",
    },

    {
      "id": "6123",
      "name": "Azure",
      "logo": "assets/img/tools/azure.png",
      "link": "https://azure.microsoft.com",
      "tab": "cloud",
      "color":"#0078D4"
    },

    {
      "id": "6124",
      "name": "google cloud",
      "logo": "assets/img/tools/google-cloud.png",
      "link": "https://cloud.google.com/",
      "tab": "cloud"
    },


  ]

}
