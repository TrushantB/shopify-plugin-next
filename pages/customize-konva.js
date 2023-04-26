import Footer from "@/components/footer";
import Header from "@/components/header";
import Head from "next/head";
import { useEffect } from "react";
export default function Customize() {
  useEffect(() => {
    const defaultOptions = {
      type: "menu",
      multiple: false,
      collapsed: true,
      collapsible: true,
      draggable: true,
    };
    const state = {
      left: [
        {
          ...defaultOptions,
          collapsed: false,
          draggable: false,
          items: [
            {
              name: "Views",
              icon: "menu-dots",
            },
            {
              name: "Elements",
              icon: "puzzle-piece",
            },
            {
              name: "Designs",
              icon: "paint-brush",
            },
            {
              name: "Image",
              icon: "images",
            },
            {
              name: "Layers",
              icon: "layers",
            },
            {
              name: "Text",
              icon: "font",
            },
          ],
        },
      ],
      right: [
        {
          ...defaultOptions,
          items: [
            {
              name: "Snap grid",
              icon: "magnet",
            },
            {
              name: "Ruler",
              icon: "ruler",
            },
            {
              name: "Print",
              icon: "print",
            },
            {
              name: "Magnifying glass",
              icon: "magnifying-glass",
              display: "popover",
            },
            {
              name: "Download",
              icon: "download",
            },
            {
              name: "Reset",
              icon: "reset",
            },
          ],
        },
      ],
    };
    var options = {
      mode: "backend",
      pagination: "thumbnails",
      addons: [
        "frames",
        "sizes",
        "forms",
        "free drawing",
        "text path",
        "services",
        "jspdf",
      ],
      layout: { ...state },
      designs: [
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk5ui_asyd67YlltoA140fkelKZjeJPvUotg&usqp=CAU",
          name: "My first design",
          categories: ["Category 1", "Category 2"],
          price: 2,
          parameters: {},
        },
        {
          src: "https://cdn.xxl.thumbs.canstockphoto.com/http-icon-blue-http-emblem-isolated-on-white-background-three-dimensional-rendering-clip-art_csp14403829.jpg",
          name: "My second design",
          categories: ["Category 2"],
          price: 3,
          parameters: {},
        },
      ],
      colors: [
        {
          name: "Black",
          value: "#000000",
          printingtypes: "Sublimation,Direct print",
          price: null,
        },
        {
          name: "Beige",
          value: "#d6ab89",
          printingtypes: "Direct print",
          price: null,
        },
        {
          name: "Gold",
          value: "http://localhost:8080/patterns/cork-board.png",
          printingtypes: "Sublimation",
          price: null,
        },
      ],
      designsCategories: [
        {
          value: "Category 1",
          children: [
            {
              value: "Category 3",
            },
          ],
        },
        {
          value: "Category 2",
        },
      ],
      printingMethods: [
        {
          name: "Direct print",
          price: "0.10",
        },
        {
          name: "Flex print",
          price: "0.50",
        },
        {
          name: "Flock print",
          price: "1",
        },
      ],
      pricingRules: [
        {
          handler: "usedColorsAmount",
          match: "all",
          scope: "first",
          target: {
            views: ["Front"],
          },
          conditions: [
            {
              operator: ">",
              value: 4,
              price: 15,
            },
          ],
        },
        {
          handler: "layersAmount",
          match: "first",
          scope: "first",
          conditions: [
            {
              operator: "<",
              value: 3,
              price: 20,
            },
            {
              operator: "<",
              value: 5,
              price: 15,
            },
          ],
        },
        {
          handler: "canvasSize",
          target: {
            views: ["Left"],
          },
          conditions: [
            {
              operator: ">",
              values: {
                height: 100,
                width: 200,
              },
              price: 3,
            },
          ],
        },
        {
          handler: "layerSize",
          match: "all",
          target: {
            types: ["Text", "QrCode", "Design"],
          },
          conditions: [
            {
              operator: ">",
              height: 100,
              price: 3,
            },
          ],
        },
        {
          handler: "textLength",
          conditions: [
            {
              operator: ">",
              value: 4,
              price: 0,
            },
          ],
        },
        {
          handler: "textLines",
          conditions: [
            {
              operator: ">",
              value: 4,
              price: 0,
            },
          ],
        },
        {
          handler: "scale",
          match: "any",
          target: {
            views: ["Left"],
            types: ["Text", "QrCode", "Design"],
          },
          conditions: [
            {
              operator: ">",
              values: {
                scaleX: 2,
                scaleY: 2,
              },
              price: 2,
            },
          ],
        },
      ],
      fontFamily: {
        google: ["Pacifico", "Droid Sans", "Droid Serif"],
        system: ["Arial"],
        files: [
          {
            "font-family": "My first font",
            src: "http://first-font-url",
            "font-weight": 400,
            "font-style": "normal",
            format: "TrueType",
          },
          {
            "font-family": "My second font",
            src: "http://second-font-url",
            "font-weight": 400,
            "font-style": "normal",
            format: "WOFF",
          },
        ],
      },
    };

    const instance = new AsukaDesigner("#myId", options); // Create an instance of the main plugin class

    instance.designer.addView("myView", /* height */ 150, /* width */ 150); // Access the subclasses from the main class
    instance.on("ready", function () {});
  }, []);
  return (
    <>
      <Header />
      <div id="myId"></div>
      <Footer />
    </>
  );
}
