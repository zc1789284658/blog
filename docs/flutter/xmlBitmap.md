# XML Bitmap
目录：
- [定义](#def)
- [文件位置](#loc)
- [编译资源类型](#type)
- [资源引用](#doc-ref)
- [语法](#syntax)
- [节点介绍](#node)
- [属性](#attr)
- [参考](#ref)
- [其他](#other)

## 定义 <span id='def' />
一个XML bitmap是一个在XML文件中定义的指向一个bitmap文件的资源。其效果是作为一个原始位图文件的别名，并且可以指定一些额外的属性。

注意：你可以在<item>节点中使用<bitmap>作为它的子节点。比如，当你定义一个state list或者layer list的时候，可以包括一个android:drawable属性

Note: You can use a <bitmap> element as a child of an<item> element. Forexample, when creating astate list orlayer list,you can exclude the android:drawableattribute from an<item> element and nest a<bitmap> inside it that defines the drawable item.

## 文件位置：<span id='loc' />

res/drawable/filename.xml

filename作为资源的ID

## 编译资源类型 <span id='type' />

指向BitmapDrawable类型的指针

## 资源引用 <span id='doc-ref' />

In Java: R.drawable.filename
In XML: @[package:]drawable/filename

## 语法:    <span id='syntax' />
```xml
<?xml version="1.0" encoding="utf-8"?>
<bitmap
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:src="@[package:]drawable/drawable_resource"
    android:antialias=["true" | "false"]
    android:dither=["true" | "false"]
    android:filter=["true" | "false"]
    android:gravity=["top" | "bottom" | "left" | "right" | "center_vertical" |
                      "fill_vertical" | "center_horizontal" | "fill_horizontal" |
                      "center" | "fill" | "clip_vertical" | "clip_horizontal"]
    android:tileMode=["disabled" | "clamp" | "repeat" | "mirror"] />
```
## 节点介绍：   <span id='node' />

`<bitmap>`  定义位图的来源和属性

## 属性:    <span id='attr' />

- xmlns:android 

    > 类型:String。定义了XML的命名空间，必须是"http://schemas.android.com/apk/res/android"。如果<bitmap>是根元素，那么他是必须的，如果是嵌套在<itme>里面，那么就不是必须的。

- android:src

    > 类型：Drawable resource。必需。 引用一个drawableresource.

- android:antialias

    > 类型：Boolean。是否开启抗锯齿。

- android:dither

    > 类型：Boolean。如果位图与屏幕的像素配置不同时，是否允许抖动.（例如：一个位图的像素设置是 ARGB 8888，但屏幕的设置是RGB 565）

- android:filter

    > 类型：Boolean。是否允许对位图进行滤波。对位图进行收缩或者延展使用滤波可以获得平滑的外观效果。

- android:gravity

    > 类型：关键字。定义位图的重力（gravity），如果位图小于其容器，使用重力指明在何处绘制

    必需是下面的属性，多个之间用  |  分隔

    Value	| Description
    -- |--
    top     |	Put the object at the top of its container, not changing its size.
    bottom  |	Put the object at the bottom of its container, not changing its size.
    left	|   Put the object at the left edge of its container, not changing its size.
    right	|   Put the object at the right edge of its container, not changing its size.
    center_vertical	|   Place object in the vertical center of its container, not changing its size
    fill_vertical   |   Grow the vertical size of the object if needed so it completely fills its container.
    center_horizontal   |	Place object in the horizontal center of its container, not changing its size.
    fill_horizontal	|   Grow the horizontal size of the object if needed so it completely fills its container.
    center	|   Place the object in the center of its container in both the vertical and horizontal axis, notchanging its size.
    fill	|   Grow the horizontal and vertical size of the object if needed so it completely fills itscontainer. This is the default.
    clip_vertical   |	Additional option that can be set to have the top and/or bottom edges of the child clipped toits container's bounds. The clip is based on the vertical gravity: a top gravity clips thebottom edge, a bottom gravity clips the top edge, and neither clips both edges.
    clip_horizontal	|   Additional option that can be set to have the left and/or right edges of the child clipped toits container's bounds. The clip is based on the horizontal gravity: a left gravity clipsthe right edge, a right gravity clips the left edge, and neither clips both edges.

- android:tileMode

    > 类型：Keyword。

    定义了tile模式。当tile模式被启用，位图是重复的，并且gravity属性将被忽略。

    必须是下列之一常量值：

    Value	|   Description
    --  |   --
    disabled	|   Do not tile the bitmap. This is the default value.
    clamp	|   Replicates the edge color if the shader draws outside of its original bounds
    repeat	|   Repeats the shader's image horizontally and vertically.
    mirror	|   Repeats the shader's image horizontally and vertically, alternating mirror images so thatadjacent images always seam.
    示例：
    ```xml

    <?xml version="1.0" encoding="utf-8"?>
    <bitmap xmlns:android="http://schemas.android.com/apk/res/android"
        android:src="@drawable/icon"
        android:tileMode="repeat" />
    ```
## 参考：   <span id='ref' />

BitmapDrawable

Creatingalias resources

## 其他 <span id='other' />
### BitmapDrawable的使用
一个BitmapDrawable就是封装了一个位图。直接以文件的方式，就是封装了一个原始的位图。以Xml方式，可以对原始的位图进行一系列的处理，比如说抗锯齿，拉伸，对齐等等。

要了解BitmapDrawable的使用，还需要明白Bitmap、BitmapFactory等类。Bitmap代表了一个原始的位图，并且可以对位图进行一系列的变换操作。BitmapFactory提供一系列的方法用于产生一个Bitmap对象。多用在Canvas中。

关于绘图和位图变换以后再学习。BitmapDrawable的使用比较简单，就是在其他的xml文件中直接引用就可以了，不过要注意在xml中定义BitmapDrawable各个属性使用和含义。