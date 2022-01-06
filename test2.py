from tkinter import *
from numpy import *
import random as rd
from scipy.sparse import data
from scipy.stats import norm
from tkinter.constants import BOTH, TOP
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg,NavigationToolbar2Tk
from matplotlib.figure import Figure
from sklearn.metrics import roc_curve,auc
import matplotlib.pyplot as plt


num_bins=30
window = Tk()
window.title('22/1/5')
topFrame = Frame(window).pack()


DataY=list()#斜線
DataX=list()#1+2
Data1=list()#mu=0
Data2=list()#mu!=0

roc_auc=0
barMax = 0
tprv = 0
fprv = 0

spe_val = StringVar()
sen_val =StringVar()
roc_val = StringVar()
barMax=0
bar=()


fig = plt.Figure(figsize = (6,6),dpi =100)
roc_pic =fig.add_subplot(423)
roc_pic.set_title('ROC Curve')
positive_pic = fig.add_subplot(424)
positive_pic.set_title('Positive')
mix_pic = fig.add_subplot(427)
mix_pic.set_title('Positive')
negative_pic = fig.add_subplot(428)
negative_pic.set_title('Positive')


canvs = FigureCanvasTkAgg(fig,master = window)
toolbar = NavigationToolbar2Tk(canvs,window)
canvs.get_tk_widget().pack(
    side=TOP,
    fill=BOTH ,
    expand=1
)

def getDataY(): 
        rtnDataY =list()
        for i in range(1000):
                rtnDataY.append(0)
                rtnDataY.append(1)
        rtnDataY.sort()
        return rtnDataY


def getData1():
        rtnData1=list()#mu=0
        for i in range(1000):
                rtnData1.append(rd.normalvariate(0,1))
        rtnData1.sort()
        return rtnData1
def getData2(mu):
        rtnData2=list()#mu=0
        for i in range(1000):
                rtnData2.append(rd.normalvariate(mu,1))
        rtnData2.sort()
        return rtnData2

def getMix(Data1,Data2):
        
        return Data1+Data2

def clear():
        roc_pic.clear()
        positive_pic.clear()
        mix_pic.clear()
        negative_pic.clear()

def draw(mu):
        
        roc_auc=0
        DataX=list()#1+2
        Data1=list()#mu=0
        Data2=list()#mu!=0
        DataY=list()
        Data1=getData1()
        Data2=getData2(mu)
        DataX=getMix(Data1,Data2)
        DataY=getDataY()
        #roc
        fpr, tpr, somvar = roc_curve( DataY, DataX )
        global tprv
        global fprv
        tprv = tpr
        fprv = fpr
        print(tpr)
        roc_auc = auc(fpr, tpr)
        barMax = len(fpr)
        bar.configure(to=barMax-1)
        update_roc(roc_auc,tpr,fpr)
        lw=3
        roc_pic.plot(fpr,tpr ,color="darkorange" , lw=lw ,label='ROC curve (area = %0.2f)' % roc_auc )
        roc_pic.plot(fpr[bar.get()],tpr[bar.get()],marker='o',markersize='7' ,color="red" , lw=lw  )
        roc_pic.plot([0.0, 1.0], [0.0, 1.0], color='navy', lw=lw, linestyle='--')
        
        


        #Negative
        n,bins,patch =negative_pic.hist( Data1 , num_bins ,facecolor = "blue",alpha = 0.3,density=True)
        y = norm.pdf( bins , 0 , 1 )
        negative_pic.plot(bins,y,"--",color ="blue")
        
        #Mix
        n,bins,patch =mix_pic.hist( DataX , num_bins ,facecolor = "blue",alpha = 0.3,density=True)
        
        y = norm.pdf( bins , mu , 1 )
        y2 = norm.pdf( bins , 0 , 1 )
        mix_pic.plot(bins,y,"--",color ="red")
        mix_pic.plot(bins,y2,"--",color ="blue")
        
        #Positive
        n,bins,patch =positive_pic.hist( Data2 , num_bins ,facecolor = "red",alpha = 0.3,density=True)
        y = norm.pdf( bins , mu , 1 )
        positive_pic.plot(bins,y,"--",color ="red")
        barFun(bar.get())
        canvs.draw()
        toolbar.update()

def update_roc(roc,tprs,fprs):       
        roc_val.set('ROC curve (area = %0.2f)' % roc)
        sen_val.set('Sensitivity:TP/(TP+FN)= %f' %tprs[bar.get()])
        spe_val.set('Sensitivity:TN/(TN+FP)= %f' %fprs[bar.get()])
        

def run(mu):
        mu = sd.get()
        global Mu
        Mu=mu
        clear()
        draw(mu)
        window.update()

def barFun(mu):
        
        global roc_pic
        global fprv
        global tprv
        mu=int(mu)
        print(tprv[mu])
        sen_val.set('Sensitivity:TP/(TP+FN)= %f' %tprv[mu])
        spe_val.set('Sensitivity:TN/(TN+FP)= %f' %fprv[mu])
        lw = 3

        roc_pic.clear()
        roc_pic.plot(fprv,tprv ,color="darkorange" , lw=lw)
        roc_pic.plot(fprv[mu],tprv[mu],marker='o',markersize='7' ,color="red" , lw=lw  )
        roc_pic.plot([0.0, 1.0], [0.0, 1.0], color='navy', lw=lw, linestyle='--')
        canvs.draw()
        

rocArea = Label(topFrame,textvariable=roc_val,text='ROC curve (area = %0.2f)' % roc_auc)
sen = Label(topFrame,textvariable=sen_val,text="Sensitivity:TP/(TP+FN)=%0.2f" %tprv)
spe = Label(topFrame,textvariable=spe_val,text="Specificity:TN/(TN+FP)=%0.2f" %fprv)
#Standard Deviation Bar
sd = Scale(topFrame, from_=-10,to=10,orient="horizontal",command=run,label="標準差" )
bar = Scale(topFrame, from_=0,to=barMax,orient="horizontal",command=barFun,label="Bar")

sen.pack(side=LEFT)
spe.pack(side=RIGHT)
rocArea.pack(side=TOP)
sd.pack(side=LEFT)
bar.pack(side=RIGHT)

run(sd.get())




window.mainloop()